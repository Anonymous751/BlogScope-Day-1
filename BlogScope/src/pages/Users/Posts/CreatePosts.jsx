import PostEditor from "./PostEditor";



const currentUser = {
  fullname: "Karam jyoti",
  email: "Karam12@gmail.com",
  password: "Karam@123",
  bio: "Updated bio ✍️ by New Data",
  profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
  id: "1"
};

function CreatePosts() {
     console.log("CurrentUser in CreatePosts:", currentUser);
  return (
    <div>
      <h1>Create Post Page</h1>
       {/* <TestUser currentUser={currentUser} /> */}
      <PostEditor currentUser={currentUser} />
    </div>
  );
}

export default CreatePosts;
