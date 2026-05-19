export function BulletList({ items }) {
  return (
    <ul className="bullet-list">
      {items.map((item) => (
        <li key={item.title}>
          <strong>{item.title}</strong>
          <span>{item.text}</span>
        </li>
      ))}
    </ul>
  );
}

export function InfoCard({ title, children }) {
  return (
    <section className="info-card">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

export function DataTable({ headers, rows }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.join("-")}>
            {row.map((cell) => (
              <td key={cell}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function CodeBlock({ code }) {
  return <pre className="code-block">{code}</pre>;
}

export function QuoteBlock({ children }) {
  return <blockquote className="quote-block">{children}</blockquote>;
}

export function MathFormula({ children }) {
  return <div className="math-formula">{children}</div>;
}
