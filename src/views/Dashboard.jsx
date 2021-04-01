import React from 'react';
import { Query } from 'react-apollo';
import POSTS_QUERY from '../services/fetch_posts';
import TrendingPosts from '../components/Trending';
import createPostApi from '../services/create_post';


const Dashboard = props => {
    const [posts, setPosts] = React.useState([]);
    const [newPost, setNewPost] = React.useState({});

    const LoadingPostsJsx = () => (
        <div>
            Loading...
        </div>
    );

    const ErrorLoadingPostsJsx = () => (
        <div className="mx-auto alert-danger">
            Error!
        </div>
    );

    const createPost = async () => {
        // alert("creatigng...");
        const res = await createPostApi(newPost);
        alert(res)
    }


    return (
        <div id="dashboard_view">
            <div className="container p-2 mx-auto row">
                <div className="col-8">
                    <form onSubmit={ e => { e.preventDefault(); createPost(); } } className="form col-12">
                        <div>
                            <label className="small col-12">Title
                                <input onChange={ e => setNewPost({
                                    ...newPost,
                                    title: e.currentTarget.value
                                }) } className="form-control" required />
                            </label>
                        </div>
                        <div>
                            <label className="small col-12">Author
                                <input onChange={ e => setNewPost({
                                    ...newPost,
                                    authpr: e.currentTarget.value
                                }) } className="form-control" required />
                            </label>
                        </div>
                        <div>
                            <label className="small col-12">Content<br />
                                <textarea onChange={ e => setNewPost({
                                    ...newPost,
                                    body: e.currentTarget.value
                                }) } className="form-control" cols="90" style={{ height: '160px' }}
                                required ></textarea>
                            </label>
                        </div>  
                        <div className="text-center">
                            <button type="submit" className="btn btn-success">Create Post</button>
                        </div>
                    </form>
                </div>
                <div className="col-3 offset-1">
                    <h4 className="text-center text-danger">
                        All Posts: {posts.length}
                    </h4>
                    <Query query={POSTS_QUERY}>
                        {
                            ({loading, error, data}) => {
                                if (loading) return LoadingPostsJsx();
                                if (error) {
                                    console.log(error);
                                    return ErrorLoadingPostsJsx();
                                }

                                const POSTS = data.posts;
                                setPosts(POSTS);

                                return posts.map(post => (
                                    <div className="pl-2 text-muted border mb-3">
                                        { post.title }
                                    </div>
                                ))
                            }
                        }
                    </Query>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;