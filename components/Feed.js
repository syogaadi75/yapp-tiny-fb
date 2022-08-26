import InputBox from "./InputBox"
import Posts from "./Posts"
import Stories from "./Stories"

function Feed({session, posts}) {
  return (
    <div className="flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
        <div className="mx-auto mx-w-md md:max-w-lg lg:max-w-2xl">
            {/* Stories */}
            <Stories session={session} />

            {/* InputBox */}
            <InputBox />

            {/* Posts */}
            <Posts posts={posts} />
        </div>
    </div>
  )
}

export default Feed