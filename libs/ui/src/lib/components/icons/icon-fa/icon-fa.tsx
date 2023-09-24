export interface IconFaProps {
  name?: string
  className?: string
}

export function IconFa ({ name, className = '' }: IconFaProps) {
  return <span role='img' className={`${name} ${className}`}></span>
}

export default IconFa