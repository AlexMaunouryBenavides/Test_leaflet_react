function LegendCost() {
	return (
		<div className="flex justify-between items-center px-[5px]">
			<div className="flex items-center">
				<div className="h-[30px] w-[30px] bg-[#040910]"></div>
				<div>
					<p>= Plus cher</p>
				</div>
			</div>
			<div className="flex items-center">
				<div className="h-[30px] w-[30px] bg-[#C1BDB3]"></div>
				<div>
					<p>No info</p>
				</div>
			</div>
			<div className="flex items-center">
				<div className="h-[30px] w-[30px] bg-[#F7FAFD]"></div>
				<div>
					<p>= Moins cher</p>
				</div>
			</div>
		</div>
	);
}

export default LegendCost;
