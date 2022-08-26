import StoryCard from "./StoryCard" 

function Stories({session}) {
    const stories = [
        {
            name: session.user.name,
            src: "https://firebasestorage.googleapis.com/v0/b/y-facebook.appspot.com/o/posts%2FIMG-20210314-WA0019.jpg?alt=media&token=e17f2edf-7904-4c43-b7dc-3db3de2137b5",
            profile: session.user.image
        },
        {
            name: "Elon Musk",
            src: "https://links.papareact.com/4zn",
            profile: "https://links.papareact.com/kxk"
        },
        {
            name: "Jeff Bezoz",
            src: "https://links.papareact.com/k2j",
            profile: "https://links.papareact.com/f0p"
        },
        {
            name: "Mark Zuckerberg",
            src: "https://links.papareact.com/xql",
            profile: "https://links.papareact.com/snf"
        },
        {
            name: "Bill Gates",
            src: "https://links.papareact.com/4u4",
            profile: "https://links.papareact.com/zvy"
        },
    ]

    return (
        <div className="flex justify-center space-x-3 mx-auto">
            {stories.map((story, index) => (
                <StoryCard key={index} name={story.name} src={story.src} profile={story.profile} />
            ))}
        </div>
    )
}

export default Stories