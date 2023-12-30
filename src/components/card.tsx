type Size = "xs" | "sm" | "md" | "lg";

interface CardProps {
  image?: string;
  title: React.ReactNode;
  button?: {
    href?: string;
    onClick?: () => void;
    children: React.ReactNode;
  };
  size?: Size;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent";
}

const VALUES_BY_SIZE: Record<Size, Record<any, any>> = {
  xs: {
    title: "mb-2 text-xl font-bold",
    buton: "btn btn-secondary btn-xs w-16",
  },
  sm: {
    title: "mb-4 text-4xl font-bold",
    buton: "btn btn-secondary btn-lg w-56",
  },
  md: {
    title: "mb-4 text-4xl font-bold",
    buton: "btn btn-secondary btn-lg w-56",
  },
  lg: {
    title: "mb-4 text-4xl font-bold",
    buton: "btn btn-secondary btn-lg w-56",
  },
};

export const Card: React.FC<CardProps> = ({
  onClick,
  variant = "primary",
  image,
  title,
  button,
  size = "md",
}) => {
  const { href, onClick: onClickButton, children } = button || {};
  const valuesBySize = VALUES_BY_SIZE[size];
  const classNameCard =
    variant === "primary"
      ? "bg-primary"
      : variant === "secondary"
      ? "bg-secondary"
      : "bg-accent";

  return (
    <div onClick={onClick} className={`card text-white ${classNameCard}`}>
      {image && (
        <figure className="px-10 pt-10">
          <img className="mask mask-hexagon-2" src={image} alt="image" />
        </figure>
      )}
      <div className="card-body text-center items-center">
        <div className="card-title">
          <h1 className={valuesBySize.title}>{title}</h1>
        </div>
        {button &&
          (href ? (
            <a href={href}>
              <button className={valuesBySize.button}>
                <span className="text-primary-content">{children}</span>
              </button>
            </a>
          ) : (
            <button
              onClick={onClickButton}
              className="btn btn-secondary btn-lg w-56"
            >
              <span className="text-primary-content">{children}</span>
            </button>
          ))}
      </div>
    </div>
  );
};
