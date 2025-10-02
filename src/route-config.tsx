import { createBrowserRouter } from "react-router-dom";
import { SignUp } from "./pages/general/signup";
import { Login } from "./pages/general/login";
import { Profile } from "./pages/auth/profile";
import { Layout } from "./pages/auth/layout";
import { Posts } from "./pages/auth/posts";
import { Settings } from "./pages/auth/settings";
import { Search } from "./pages/auth/search";
import { Account } from "./pages/auth/account";
import { Following } from "./pages/auth/followings";
import { Followers } from "./pages/auth/followers";
import { Request } from "./pages/auth/requests";
import { PostCard } from "./pages/auth/post-card-id";

export const router = createBrowserRouter([
	{path: "", element:<SignUp/>},
	{path: "login", element:<Login/>},
	{path: "profile", element:<Layout/>,children:[
		{path:"post",children:[
			{ path: ":id/:userid", element: <PostCard /> }
		]},
		{path:"",element:<Profile/>},
		{path:"posts",element:<Posts/>},
		{ path: "settings", element: <Settings/>},
		{path: "search", element: <Search/>},
		{ path: ":id", element: <Account /> },
		{ path: "following", element: <Following /> },
		{ path: "followers", element: <Followers /> },
		{ path: "requests", element: <Request/> },
	]},
])