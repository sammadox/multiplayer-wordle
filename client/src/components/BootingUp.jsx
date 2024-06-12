import LoadingAnimation from "./LoadingAnimation"

const BootingUp = () => {
    return <div className="server-boot-wait">
        <p>Booting up the server...</p>
        <LoadingAnimation />
        <ul>
            <li>{`Currently, I'm hosting the server on the free tier of Render.`}</li>
            <li>This makes the instance spin down with inactivity.</li>
            <li>In the free tier, it can take up to 50s for reactivating.</li>
            <li>{`I hope this little wait will be worth it when you beat your friend! 💪`}</li>
        </ul>
    </div>
}

export default BootingUp