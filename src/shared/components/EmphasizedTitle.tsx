import {parseTitleEmphasis} from '../utils/title'

export function EmphasizedTitle({title}: {title: string}) {
  return parseTitleEmphasis(title).map((part, i) =>
    part.emphasis ? <em key={i}>{part.text}</em> : part.text,
  )
}
