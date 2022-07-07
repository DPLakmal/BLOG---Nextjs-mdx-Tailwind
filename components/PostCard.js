const PostCard = ({ post }) => {
    return (

        <div className=" h-96 shadow-lg min-h-300 justify-between flex-1 basis-80 bg-cover shrink 
         transition-all
        duration-500 hover:shadow-2xl shadow-gray-250  ease-out overflow-hidden flex-col flex relative 
        bg-white/50 rounded-md ">

            <div className="relative block overflow-hidden rounded-t-md">
                <img src={post.frontMatter.cover_image} alt="Cover Image"
                    className="h-200 w-auto bg-cover scale-100 hover:scale-125
                ease-out duration-1000 transition-all" />
            </div>


            <div className="grow flex flex-col justify-between ">
                <div className="p-6 grow relative block">
                    <h2 className="font-semibold text-xl text-center">
                        {post.frontMatter.title}
                    </h2>
                </div>

            </div>



        </div>

    )
}

export default PostCard;