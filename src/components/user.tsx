import React from "react";

interface UserProps {
  size?: "md" | "lg";
}

export const User: React.FC<UserProps> = ({ size = "md" }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const [user, setUser] = React.useState<{
    avatar_url: string;
    name: string;
  }>();

  React.useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((res: any) => {
        // console.log("user", { res });
        if (res.success) {
          setUser(res.data.user.user_metadata);
        }
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      {/* {showMenu && (
        <ul className="menu bg-base-200 w-56 rounded-box">
          <li>
            <a>Logout</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      )} */}
      {user && (
        <div
          className={`flex-col flex items-center ${
            size === "lg" ? "w-64" : "w-32"
          }`}
          onClick={() => setShowMenu((showMenu) => !showMenu)}
        >
          <div className="avatar">
            <div className={`${size === "lg" ? "w-24" : "w-12"} rounded-full`}>
              <img src={user.avatar_url} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
