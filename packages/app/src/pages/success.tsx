import { type NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { BaseLayout } from "layouts/BaseLayout";
import { Button } from "components/Button";
import { Leaves } from "components/particles/Leaves";

const Bee = () => (
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
    <g id="bee">
      <g>
        <polygon
          style={{ fill: "#FEC738" }}
          points="102,256 77,256 77,282 51,282 51,307 77,307 77,333 102,333 102,358 128,358 128,332.8 
			128,307.2 128,281.6 128,256 128,230 102,230 		"
        />
        <polygon
          style={{ fill: "#FEC738" }}
          points="179,256 154,256 154,281.6 154,307.2 154,332.8 154,358.4 154,384 179.2,384 205,384 
			205,358.4 205,332.8 205,307.2 205,282 179,282 		"
        />
        <polygon
          style={{ fill: "#FEC738" }}
          points="333,282 333,256 333,230 307,230 307,256 307,281.6 307,307.2 307,332.8 307,358 333,358 
			333,332.8 333,307 358,307 358,282 		"
        />
        <polygon
          style={{ fill: "#FEC738" }}
          points="230,307 230,332.8 230,358.4 230,384 256,384 282,384 282,358.4 282,332.8 282,307 
			256,307 		"
        />
      </g>
      <polygon
        style={{ fill: "#BFC0C0" }}
        points="307,154 307,128 307,102 281.6,102 256,102 230,102 230,128 256,128 256,154 282,154 
		282,179 307,179 307,204.8 307,230 333,230 333,204.8 333,179.2 333,154 	"
      />
      <rect
        x="128"
        y="230"
        style={{ fill: "#070000" }}
        width="26"
        height="25.68"
      />
      <rect
        x="128"
        y="255.68"
        style={{ fill: "#070000" }}
        width="26"
        height="25.68"
      />
      <polygon
        style={{ fill: "#FFFFFF" }}
        points="384,230 384,256 384,282 410,282 410,256 410,230 	"
      />
      <rect
        x="128"
        y="281.36"
        style={{ fill: "#070000" }}
        width="26"
        height="25.68"
      />
      <rect
        x="204.8"
        y="281.6"
        style={{ fill: "#070000" }}
        width="25.6"
        height="25.6"
      />
      <polygon
        style={{ fill: "#A0A09C" }}
        points="282,179 282,154 256,154 256,128 230.4,128 205,128 205,102 179.2,102 153.6,102 128,102 
		128,128 102,128 102,153.6 102,179 128,179 128,204.8 128,230 154,230 154,256 179,256 179,282 204.8,282 230,282 230,307 256,307 
		282,307 282,282 307,282 307,256 307,230.4 307,204.8 307,179 	"
      />
      <rect
        x="281.6"
        y="281.6"
        style={{ fill: "#070000" }}
        width="25.6"
        height="25.6"
      />
      <rect
        x="128"
        y="307.04"
        style={{ fill: "#070000" }}
        width="26"
        height="25.68"
      />
      <rect
        x="204.8"
        y="307.2"
        style={{ fill: "#070000" }}
        width="25.6"
        height="25.6"
      />
      <rect
        x="281.6"
        y="307.2"
        style={{ fill: "#070000" }}
        width="25.6"
        height="25.6"
      />
      <rect
        x="128"
        y="332.72"
        style={{ fill: "#070000" }}
        width="26"
        height="25.68"
      />
      <rect
        x="204.8"
        y="332.8"
        style={{ fill: "#070000" }}
        width="25.6"
        height="25.6"
      />
      <rect
        x="281.6"
        y="332.8"
        style={{ fill: "#070000" }}
        width="25.6"
        height="25.6"
      />
      <g>
        <polygon
          style={{ fill: "#070000" }}
          points="435,281.6 435,256 435,230 410,230 410,256 410,282 384,282 384,256 384,230 410,230 
			410,205 384,205 358.4,205 333,205 333,230.4 333,256 333,282 358,282 358,307 384,307 384,333 409.6,333 435,333 435,307.2 		"
        />
        <rect
          x="435"
          y="333"
          style={{ fill: "#070000" }}
          width="26"
          height="25"
        />
      </g>
      <rect
        x="204.8"
        y="358.4"
        style={{ fill: "#070000" }}
        width="25.6"
        height="25.6"
      />
      <rect
        x="281.6"
        y="358.4"
        style={{ fill: "#070000" }}
        width="25.6"
        height="25.6"
      />
      <g>
        <rect
          x="102"
          y="358"
          style={{ fill: "#9F7424" }}
          width="26"
          height="26"
        />
        <rect
          x="77"
          y="384"
          style={{ fill: "#9F7424" }}
          width="25"
          height="26"
        />
        <rect
          x="179"
          y="384"
          style={{ fill: "#9F7424" }}
          width="26"
          height="26"
        />
        <rect
          x="256"
          y="384"
          style={{ fill: "#9F7424" }}
          width="26"
          height="26"
        />
        <rect
          x="154"
          y="410"
          style={{ fill: "#9F7424" }}
          width="25"
          height="25"
        />
        <rect
          x="230"
          y="410"
          style={{ fill: "#9F7424" }}
          width="26"
          height="25"
        />
      </g>
    </g>
    <g id="Layer_1"></g>
  </svg>
);

const Success: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/leaderboard");
    }, 5000);
    return () => window.clearTimeout(timer);
  });
  return (
    <BaseLayout>
      <div className="h-full overflow-hidden bg-green-100">
        <div className="">
          <div>
            <div className="mt-24 text-center text-2xl font-bold uppercase tracking-widest text-green-900">
              Awesome!
            </div>
          </div>
          <div
            className="flex animate-[flyIn_5s_ease-out] justify-center pt-4"
            style={{
              animationFillMode: "forwards",
            }}
          >
            <div className="h-16 w-16 animate-flying ">
              <Bee />
            </div>
          </div>
          <h3 className="pt-8 text-center  text-green-800">
            Your tokens are on the way to the hive!
          </h3>

          <div className="mt-12 flex justify-center">
            <Link href={"/leaderboard"}>
              <Button intent={"primary"}>Go to leaderboard</Button>
            </Link>
          </div>
          <Leaves />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Success;
