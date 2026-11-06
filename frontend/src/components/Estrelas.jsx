export default function Estrelas({ nota }) {
    return <span>{"★".repeat(nota) + "☆".repeat(5 - nota)}</span>;
}