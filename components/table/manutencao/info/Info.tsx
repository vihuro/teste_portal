export default function Info({ changeToogle }: { changeToogle: Function }) {
    return (
        <main>
            <button onClick={() => changeToogle(false)} >
                BACK
            </button>
        </main>
    )
}