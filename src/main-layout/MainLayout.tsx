import "./MainLayout.css";

export function MainLayout(props: { side: React.ReactElement, main: React.ReactElement }) {
  return (
    <div className="container">
      <div className="sidebar">
        {props.side}
      </div>

      <div className="main-content">
        {props.main}
      </div>
    </div>
  );
}