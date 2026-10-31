export default function Footer({ totalFilmes }) {
    return (
        <footer>
            <small>CineTrack © 2026 · {totalFilmes} filmes cadastrados</small>
        </footer>
    );
}