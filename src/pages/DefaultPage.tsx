import { LottieBulldog } from "../components/Lottie/DefaultPageLottie/LottieBulldog";

function DefaultPage() {
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '100px'}}>
            <h1>Default Page</h1>
            <h3>Bulldog is a good boy, <br/>try to pet him</h3>
            <LottieBulldog />
        </div>
    )
}

export default DefaultPage;