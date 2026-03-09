import React from 'react';
import MotionReveal from '@/components/common/MotionReveal';
import TImages from '@/utils/images';

const About = () => {
	return (
		<section className="w-full px-4 sm:px-6 lg:px-10">
			<div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 md:flex-row md:items-center md:gap-10 lg:gap-16">
				<MotionReveal animation="fade-right" delay={0.1}>
					<div className="flex justify-center md:justify-start">
						<img
							src={TImages.DECORATIVE_ELEMENTS.ECLIPSE_HIMALKOM}
							alt="Eclipse Himalkom"
							className="w-[220px] sm:w-[300px] md:w-[340px] lg:w-[420px]"
						/>
					</div>
				</MotionReveal>

				<MotionReveal animation="fade-left" delay={0.2}>
					<div className="text-white max-w-2xl text-center md:text-left">
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold italic">What is HIMALKOM?</h2>
						<p className="mt-3 text-base sm:text-lg lg:text-xl leading-relaxed text-white/90">
							Himpunan Mahasiswa Ilmu Komputer (HIMALKOM) adalah himpunan yang bergerak dalam
							pengembangan dan eksistensi mahasiswa ilmu Komputer IPB.
						</p>

						<h3 className="mt-8 text-3xl sm:text-4xl lg:text-5xl font-semibold italic">HIMALKOM Goals</h3>
						<p className="mt-3 text-base sm:text-lg lg:text-xl leading-relaxed text-white/90">
							Mencerdaskan ilkomerz agar siap dan semangat untuk menjadi profesional, memperkuat
							internalisasi, meningkatkan eksistensi, dan membangun Ilmu Komputer IPB berdasarkan
							aspirasi Ilkomerz sehingga tercipta hasil yang dahsyat.
						</p>
					</div>
				</MotionReveal>
			</div>
		</section>
	);
};

export default About;
