import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ic404Dark from "../../assets/icons/ic_404_dark.svg";
import ic404Light from "../../assets/icons/ic_404_light.svg";

import { IRootState } from "../../store";
import { ROUTE_LINK } from "../../routers/module-router";

const NotFoundPage = () => {
    const isDark = useSelector(
        (state: IRootState) =>
            state.themeConfig.theme === "dark" || state.themeConfig.isDarkMode
    );

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
            <div className="px-6 py-16 text-center font-semibold before:container before:absolute before:left-1/2 before:-translate-x-1/2 before:rounded-full before:bg-[linear-gradient(180deg,#4361EE_0%,rgba(67,97,238,0)_50.73%)] before:aspect-square before:opacity-10 md:py-20">
                <div className="relative">
                    <img
                        src={isDark ? ic404Dark : ic404Light}
                        alt="404"
                        className="mx-auto -mt-10 w-full max-w-xs object-cover md:-mt-14 md:max-w-xl"
                    />
                    <p className="mt-5 text-base dark:text-white uppercase">
                        404 - Trang bạn tìm không tồn tại!
                    </p>
                    <Link
                        to={ROUTE_LINK.ORDER}
                        className="btn btn-gradient mx-auto !mt-7 w-max border-0 uppercase shadow-none"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
