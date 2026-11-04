import { appStoreHref } from "@/lib/site";
import Image from "next/image";

export default function AppLaunchStatus() {
  const href = appStoreHref();
  return href ? (
    <a href={href} className="ic-store-badge" aria-label="Download Iron Compass AI on the App Store">
      <Image src="/images/badges/download-on-the-app-store-black-en-us.svg" alt="Download on the App Store" width={144} height={48} unoptimized />
    </a>
  ) : <p className="ic-launch-status">Use the web app now. iPhone app: Apple review pending.</p>;
}
