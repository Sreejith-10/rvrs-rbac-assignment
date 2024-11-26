import {ComponentProps, forwardRef} from "react";

const Toggle = forwardRef<HTMLInputElement, ComponentProps<"input">>(
	({...props}, ref) => {
		return (
			<label
				htmlFor="check"
				className="bg-gray-200 w-16 h-8 inline-block relative rounded-full border border-slate-400 cursor-pointer">
				<input
					type="checkbox"
					id="check"
					className="w-0 h-0 -z-50 peer"
					ref={ref}
					{...props}
				/>
				<span className="bg-slate-400 w-6 h-6 inline-block rounded-full absolute left-[4px] top-0 translate-y-[12%] peer-checked:translate-x-[30px] duration-500 transition-all peer-checked:bg-slate-700 " />
			</label>
		);
	}
);
Toggle.displayName = "Toggle";

export {Toggle};
