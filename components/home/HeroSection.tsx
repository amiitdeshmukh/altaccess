function CheckIcon() {
	return (
		<svg viewBox="0 0 16 17" aria-hidden="true" className="h-4 w-4 shrink-0 text-[#235BE2]">
			<path
				d="M6.4 12.5 2.4 8.5l1.128-1.128L6.4 10.236 12.472 4.164 13.6 5.3 6.4 12.5Z"
				fill="currentColor"
			/>
		</svg>
	);
}

const chartImages = [
	"/static-assets/home-page/herosection/chart-1.png",
	"/static-assets/home-page/herosection/chart-2.png",
	"/static-assets/home-page/herosection/chart-3.png",
];

function ArrowIcon() {
	return (
		<svg viewBox="0 0 256 256" aria-hidden="true" className="h-4.5 w-4.5">
			<path
				d="M200 64V168a8 8 0 0 1-16 0V83.31L69.66 197.66a8 8 0 1 1-11.32-11.32L172.69 72H88a8 8 0 0 1 0-16H192a8 8 0 0 1 8 8Z"
				fill="currentColor"
			/>
		</svg>
	);
}

function HeroChartCard() {
	return (
		<div className="w-full max-w-117 rounded-3xl border border-[#d7e6ff] bg-white p-3 md:p-4">
			<div className="hero-chart-window rounded-[14px] border border-[#e5ecff] bg-[#f7f9ff]">
				<div className="hero-chart-track">
					{[...chartImages, chartImages[0]].map((image, idx) => (
						<img
							key={`${image}-${idx}`}
							src={image}
							alt="Fund return chart"
							className="hero-chart-slide"
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default function HeroSection() {
	return (
		<section className="overflow-hidden bg-white">
			<div className="mx-auto w-full max-w-347.5 px-4 pb-10 pt-6 sm:px-6 md:px-8 lg:px-8">
				<div className="mt-2 grid grid-cols-1 items-center gap-8 lg:mt-8 lg:grid-cols-[1fr_468px] lg:gap-8">
					<div>
						<div className="inline-flex items-center gap-2 rounded-[29px] bg-[rgba(8,106,234,0.17)] px-3 py-1.5">
							<span className="h-2.5 w-2.5 rounded-full bg-[#235BE2]" />
							<span className="text-[13px] font-light text-[#101828]">Trusted by 50+ Partners</span>
						</div>

						<h1 className="mt-4 text-[36px] font-semibold leading-[120%] text-[#101828] sm:text-[42px] md:text-[48px]">
							Invest in Top Performing
						</h1>
						<h2 className="text-[36px] font-extrabold leading-[120%] text-[#235BE2] sm:text-[42px] md:text-[48px]">
							PMS &amp; AIFs
						</h2>

						<ul className="mt-5 space-y-3">
							<li className="flex items-center gap-2 text-[16px] leading-[140%] md:text-[18px]">
								<CheckIcon />
								<span className="text-[#6D6D6D]">
									<span className="font-normal">Consistently </span>
									<span className="font-bold text-[#101828]">beat the benchmarks</span>
								</span>
							</li>
							<li className="flex items-center gap-2 text-[16px] leading-[140%] md:text-[18px]">
								<CheckIcon />
								<span className="text-[#6D6D6D]">
									<span className="font-bold text-[#101828]">SEBI Registered</span>
									<span className="font-normal"> Funds</span>
								</span>
							</li>
							<li className="flex items-center gap-2 text-[16px] leading-[140%] md:text-[18px]">
								<CheckIcon />
								<span className="text-[#6D6D6D]">
									<span className="font-bold text-[#101828]">Professionally</span>
									<span className="font-normal"> curated funds</span>
								</span>
							</li>
						</ul>

						<div className="mt-6 flex flex-wrap items-center gap-3">
							  <button className="inline-flex h-11 items-center gap-2 rounded-[9px] bg-[linear-gradient(175deg,#0939AD_0%,#4B72CC_100%)] px-4 text-[15px] font-bold text-white shadow-[2px_3px_6px_0px_rgba(0,0,0,0.22)] md:h-12.5 md:px-5 md:text-[18px]">
								Explore PMS &amp; AIFs <ArrowIcon />
							</button>
							  <button className="inline-flex h-11 items-center gap-2 rounded-[9px] bg-[linear-gradient(-32.5941deg,#0C1D45_0%,#164AC8_100%)] px-4 text-[15px] font-medium text-white md:h-12.5 md:px-5 md:text-[18px]">
								Book a Call <ArrowIcon />
							</button>
						</div>
					</div>

					<div className="w-full">
						<HeroChartCard />
					</div>
				</div>
			</div>
		</section>
	);
}
