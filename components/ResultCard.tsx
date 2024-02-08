import Image from "next/image";
import Link from "next/link";
import "./ResultCard.css";
import { useRouter } from "next/router";
interface ResultCardProps {
  title: string;
  imageUrl: string;
  id: string;
  lastElement?: any;
  type: string;
}

const ResultCard = ({
  title,
  imageUrl,
  id,
  lastElement,
  type,
}: ResultCardProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/Details?type=${type}&id=${id}`);
  };
  return (
    <button
      onClick={handleClick}
      className="flex flex-col text-slate-500"
      ref={lastElement || null}
    >
      <figure className="w-full rounded shadow-xl bg-slate-200 bg-opacity-80">
        <div className="relative object-cover cover rounded overflow-hidden">
          <Image
            className="object-cover w-full h-full transition hover:scale-105"
            fill
            alt={`${title} image`}
            src={imageUrl}
            priority
          />
        </div>
      </figure>
      <div className="mt-4 w-full">
        <h1 className="title select-none line-clamp-2">{title}</h1>
      </div>
    </button>
  );
};

export default ResultCard;
