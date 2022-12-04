import React from "react";
import DonutChart from "react-donut-chart";
import classes from "./Chart.module.css";
const Chart = () => {
	const TotalDays = 60;
	const RemainingDays = 25;
	const Holidays = 5;
	const data = [
		{
			label: "Remaining Days",
			value: RemainingDays,
		},
		{
			label: "Holidays",
			value: Holidays,
		},
		{
			label: "Total Days",
			value: TotalDays,
		},
	];

	const colors = ["#000000", "#ff4361", "#FCC00E"];
	return (
		<section className={classes["global-card"]}>
			<h1 className={classes["section-title"]}>
				<span>Subscription </span> Days
			</h1>
			<div className={classes.chart}>
				<DonutChart colors={colors} data={data} />
			</div>
		</section>
	);
};

export default Chart;
