interface Props {
  code: string
  size?: 'sm' | 'md'
}

export default function CountryBadge({ code, size = 'sm' }: Props) {
  const cls = size === 'md'
    ? 'inline-flex items-center justify-center w-7 h-5 rounded bg-gray-100 text-[8px] font-bold text-navy'
    : 'inline-flex items-center justify-center w-6 h-[18px] rounded bg-gray-100 text-[7px] font-bold text-navy'
  return <span className={cls}>{code}</span>
}
