import * as vega from "vega";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as SandDanceReact from "@msrvida/sanddance-react";

export default function Charts() {
	SandDanceReact.use(React, ReactDOM, vega);

	const data = [
		{ a: 1, b: "c1" },
		{ a: 1, b: "c2" },
		{ a: 2, b: "c3" },
		{ a: 3, b: "c4" },
	];

	const insight = {
		columns: {
			x: "a",
			color: "b",
		},
		scheme: "set1",
		chart: "barchartV",
		view: "2d",
		size: {
			height: 800,
			width: 800,
		},
	};
	return <SandDanceReact.Viewer data={data} insight={insight} />;
}
