import { getAuthorizeURL } from "../provider/authorizeURL";

export const AuthorizationPage = () => { 
    const onClick = async () => {
        const url = await getAuthorizeURL()
        window.location.href = url;
      }

    return (
        <div className="App">
            <div>
                <h1>Not quite there yet:/</h1>
                <h2>You are not yet authenticated and not have granted this app the necessary permissions.</h2>
                <button onClick={onClick}>Switch to Spotify for a moment</button>
            </div>
        </div>
    )
}