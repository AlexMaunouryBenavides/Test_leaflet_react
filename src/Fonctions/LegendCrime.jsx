function LegendCrime() {
	return (
		<div className="flex justify-between items-center px-[5px]">
			<div className="flex items-center">
				<div className="h-[30px] w-[30px] bg-[#380A5F]"></div>
				<div>
					<p>= Pas bon</p>
				</div>
			</div>
			<div className="flex items-center">
				<div className="h-[30px] w-[30px] bg-[#FFF]"></div>
				<div>
					<p>No info</p>
				</div>
			</div>
			<div className="flex items-center">
				<div className="h-[30px] w-[30px] bg-[#4983FF]"></div>
				<div>
					<p>= Bon</p>
				</div>
			</div>
		</div>
	);
}

export default LegendCrime;
