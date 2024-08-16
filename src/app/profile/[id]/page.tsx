export default function ProfilePage({params} : any) {
    return (
        <div>
            <h1>Profile</h1>
            <p>Username: {params.id}</p>
        </div>
    );
}