import chat from '../../assets/images/icon-chat.png'
import money from '../../assets/images/icon-money.png'
import security from '../../assets/images/icon-security.png'

const items = [
    {
        src: chat,
        alt: "Chat Icon",
        title: "You are our #1 priority",
        text: "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
    },
    {
        src: money,
        alt: "Money Icon",
        title: "More savings means higher rates",
        text: "The more you save with us, the higher your interest rate will be!",
    },
    {
        src: security,
        alt: "Security Icon",
        title: "Security you can trust",
        text: "We use top of the line encryption to make sure your data and money is always safe.",
    },
]

function FeatureItem() {
    return (
        items.map((item, index) => (
                <div className="feature-item" key={index}>
                    <img src={item.src} alt={item.alt} className="feature-icon"/>
                    <h3 className="feature-item-title">{item.title}</h3>
                    <p>
                        {item.text}
                    </p>
                </div>
            )
        )
    )
}

export default FeatureItem;