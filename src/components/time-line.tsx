export interface TimeLineProps {
  data: { id: number; title: string; subtitle: string; description: string }[];
}

function TimeLine({ data }: TimeLineProps) {
  return (
    <ol className="relative border-s-2 border-gray-200 dark:border-gray-700">
      {data.map((item) => (
        <li className="mb-10 ms-6" key={item.id}>
          <span className="absolute flex items-center justify-center w-7 h-7 bg-blue-500 rounded-full -start-3.5">
            <svg
              className="w-3 h-3 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </span>
          <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            {item.title}
          </h3>
          <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {item.subtitle}
          </time>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            {item.description.split(',').map((line) => (
              <span className="block" key={line}>
                {item.description.split(',').length > 1 ? `- ${line}` : line}
              </span>
            ))}
          </p>
        </li>
      ))}
    </ol>
  );
}

export default TimeLine;
