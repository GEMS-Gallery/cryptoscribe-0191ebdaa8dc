import { backend } from 'declarations/backend';

let quill;

document.addEventListener('DOMContentLoaded', async () => {
  quill = new Quill('#editor', {
    theme: 'snow'
  });

  const newPostBtn = document.getElementById('new-post-btn');
  const postForm = document.getElementById('post-form');
  const submitPostBtn = document.getElementById('submit-post');
  const postsContainer = document.getElementById('posts');

  newPostBtn.addEventListener('click', () => {
    postForm.style.display = postForm.style.display === 'none' ? 'block' : 'none';
  });

  submitPostBtn.addEventListener('click', async () => {
    const title = document.getElementById('post-title').value;
    const author = document.getElementById('post-author').value;
    const body = quill.root.innerHTML;

    if (title && author && body) {
      await backend.addPost(title, body, author);
      document.getElementById('post-title').value = '';
      document.getElementById('post-author').value = '';
      quill.setContents([]);
      postForm.style.display = 'none';
      await displayPosts();
    }
  });

  await displayPosts();
});

async function displayPosts() {
  const posts = await backend.getPosts();
  const postsContainer = document.getElementById('posts');
  postsContainer.innerHTML = '';

  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.innerHTML = `
      <h2>${post.title}</h2>
      <div class="post-meta">By ${post.author} on ${new Date(Number(post.timestamp) / 1000000).toLocaleString()}</div>
      <div>${post.body}</div>
    `;
    postsContainer.appendChild(postElement);
  });
}