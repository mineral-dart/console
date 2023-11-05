import { EnvironmentModeEnum } from "@console/enums";
import { Tag, TagSize } from "../tag/tag";

export interface TagModeProps {
  status: EnvironmentModeEnum
  size?: TagSize
}

export function TagMode ({ status, size = TagSize.NORMAL }: TagModeProps) {

  console.log(status);
  
  function formatStatusName (status: EnvironmentModeEnum) {
    switch (status) {
      case EnvironmentModeEnum.PRODUCTION:
        return (
          <Tag size={size} className="bg-brand-50 text-brand-500 border border-brand-500">
            PROD
          </Tag>
        )
      case EnvironmentModeEnum.DEVELOPMENT:
        return (
          <Tag size={size} className="bg-neutral-150 text-neutral-350 border border-neutral-350">
            DEV
          </Tag>
        )
      case EnvironmentModeEnum.PREVIEW:
        return (
          <Tag size={size} className="bg-purple-50 text-purple-500 border border-purple-500">
            PREVIEW
          </Tag>
        )
      case EnvironmentModeEnum.STAGING:
        return (
          <Tag size={size} className="bg-neutral-150 text-neutral-350 border border-neutral-350">
            STAGING
          </Tag>
        )
      default:
        return '-'

    }
  }

  return <>{ formatStatusName(status) }</>
}
