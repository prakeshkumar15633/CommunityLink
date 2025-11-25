import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Announcement from '../components/Community/Announcement/Announcement.jsx'
import Business from '../components/Community/Business/Business.jsx'
import DiscussionForum from '../components/Community/DiscussionForum/DiscussionForum.jsx'
import Event from '../components/Community/Event/Event.jsx'
import ManageCommuntiy from '../components/Community/ManageCommunity/ManageCommunity.jsx'
import Poll from '../components/Community/Poll/Poll.jsx'
import Sports from '../components/Community/Sports/Sports.jsx'
import Volunteer from '../components/Community/Volunteer/Volunteer.jsx'
import Community from "./Community/Community.jsx"
import CommunityPage from './Community/CommunityPage.jsx'
import DiscussionForumCard from "./Community/DiscussionForum/DiscussionForumCard/DiscussionForumCard.jsx"
import Feedback from './Community/Feedback/Feedback.jsx'
import Visitor from "./Community/Visitor/Visitor.jsx"
import './Demo.css'
import ErrorRoute from "./ErrorRoute"
import Home from './Home/Home'
import Login from "./Login/Login.jsx"
import RootLayout from "./RootLayout"
import UserProfile from "./UserProfile/UserProfile.jsx"

function Demo() {
    let router = createBrowserRouter([
        {
            path: '',
            element: <RootLayout />,
            errorElement: <ErrorRoute />,
            children: [
                {
                    path: '',
                    element: <Home />,
                },
                {
                    path: 'login',
                    element: <Login />
                },
                {
                    path: 'communities',
                    element: <Community />,
                },
                {
                    path: 'community/:cid',
                    element: <CommunityPage />,
                    children: [
                        {
                            path: '',
                            element: <ManageCommuntiy />
                        },
                        {
                            path: 'discussion-forums',
                            element: <DiscussionForum />,
                            children: [
                                {
                                    path: 'discussion-forum/:id',
                                    element: <DiscussionForumCard />
                                }
                            ]
                        },
                        {
                            path: 'announcements',
                            element: <Announcement />
                        },
                        {
                            path: 'polls',
                            element: <Poll />
                        },
                        {
                            path: 'businesses',
                            element: <Business />
                        },
                        {
                            path: 'events',
                            element: <Event />
                        },
                        {
                            path: 'feedback',
                            element: <Feedback />
                        },
                        {
                            path: 'sports',
                            element: <Sports />
                        },
                        {
                            path: 'volunteer',
                            element: <Volunteer />
                        },
                        {
                            path: 'visitor',
                            element: <Visitor />
                        }
                    ]
                },
                {
                    path: 'user-profile',
                    element: <UserProfile />
                }
            ]
        }
    ]);
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    )
}

export default Demo