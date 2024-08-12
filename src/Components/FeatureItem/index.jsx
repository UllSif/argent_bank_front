const items = [
    {
        image: "icon-chat.png",
        alt: "Chat Icon",
        title: "You are our #1 priority",
        paragraph: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
        image: "icon-money.png",
        alt: "Money Icon",
        title: "More savings means higher rates",
        paragraph: "The more you save with us, the higher your interest rate will be!",
    },
    {
        image: "icon-security.png",
        alt: "Security Icon",
        title: "Security you can trust",
        paragraph: "We use top of the line encryption to make sure your data and money is always safe.",
    },
]

function FeatureItem() {
    return (
        items.map((item, index) => (
                <div className="feature-item" key={index}>
                    <img src={`../../src/assets/images/${item.image}`} alt={item.alt} className="feature-icon"/>
                    <h3 className="feature-item-title">{item.title}</h3>
                    <p>
                        {item.paragraph}
                    </p>
                </div>
            )
        )
    )
}

export default FeatureItem;