interface Props {
  current: number
  total: number
}

export default function StepIndicator({ current, total }: Props) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-text-secondary font-medium">ステップ {current} / {total}</span>
      <span className="inline-flex items-center justify-center w-8 h-5 rounded-full bg-primary/10 text-[11px] font-semibold text-primary">
        {current} / {total}
      </span>
    </div>
  )
}
