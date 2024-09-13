import Func "mo:base/Func";
import Text "mo:base/Text";

import Array "mo:base/Array";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Order "mo:base/Order";

actor {
  // Define the Post type
  public type Post = {
    title: Text;
    body: Text;
    author: Text;
    timestamp: Int;
  };

  // Use a stable variable to store posts
  stable var posts : [Post] = [];

  // Function to add a new post
  public func addPost(title: Text, body: Text, author: Text) : async () {
    let newPost : Post = {
      title = title;
      body = body;
      author = author;
      timestamp = Time.now();
    };
    posts := Array.append(posts, [newPost]);
  };

  // Function to get all posts, sorted by timestamp (most recent first)
  public query func getPosts() : async [Post] {
    Array.sort(posts, func(a: Post, b: Post) : Order.Order {
      Int.compare(b.timestamp, a.timestamp)
    })
  };
}