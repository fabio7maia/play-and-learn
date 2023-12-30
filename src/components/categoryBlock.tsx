import React from "react";
import { CATEGORIES } from "../constants/category";
import { storage } from "../lib/storage";
import { Card } from "./card";

export const CategoryBlock: React.FC = () => {
  const { settings } = storage.get();
  const [levels, setLevels] = React.useState([undefined, undefined]);

  const renderCategory = (category: any, level = 0) => {
    const isSelected = levels[level] !== undefined;
    const res = [];

    if (isSelected) {
      if (category.text === levels[level]) {
        res.push(
          <div key={`${category.text}-${level}-${isSelected}`} className="m-2">
            <Card
              title={category.text}
              size="xs"
              onClick={() => {
                setLevels((levels) => {
                  levels[0] = undefined;

                  return [...levels];
                });
              }}
            />
          </div>
        );

        if (category.children) {
          res.push(
            <>
              {category.children.map((x: any) => {
                return (
                  <div
                    key={`${category.text}-${level}-${isSelected}`}
                    className="m-2"
                  >
                    <Card
                      title={x.text}
                      size="xs"
                      variant="secondary"
                      onClick={() => {
                        storage.set({
                          settings: {
                            ...settings,
                            category: x.text,
                          },
                        });

                        window.location.href = "/";
                      }}
                    />
                  </div>
                );
              })}
            </>
          );
        }
      }
    } else {
      res.push(
        <div key={`${category.text}-${level}-${isSelected}`} className="m-2">
          <Card
            title={category.text}
            size="xs"
            onClick={() => {
              setLevels((levels) => {
                levels[level] = category.text;

                return [...levels];
              });
            }}
          />
        </div>
      );
    }

    return res;
  };

  console.log("CategoryBlock", {
    levels,
  });

  return (
    <>
      {CATEGORIES.map((category) => {
        return renderCategory(category);
      })}
    </>
  );
};
