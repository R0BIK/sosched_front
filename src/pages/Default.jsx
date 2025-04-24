export default function Page()  {

    return (
        <form method="POST">
            <input name="email" autoComplete="email"/>
            <input type="password" name="password" autoComplete="new-password"/>
            <button type="submit">Sign Up</button>
        </form>
    )
}