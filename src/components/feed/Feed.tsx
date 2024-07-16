import Post from "./Post";

function Feed() {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col g-12">
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default Feed;
