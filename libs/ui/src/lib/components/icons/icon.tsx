import {IconAwesomeEnum, IconEnum} from "@console/enums";
import {PlusIcon} from '@heroicons/react/24/outline'
import { AcademicCapIcon, ChevronDownIcon, Cog6ToothIcon, EllipsisVerticalIcon, EyeIcon, WalletIcon } from '@heroicons/react/20/solid'

import {GithubIcon, GithubWhiteIcon} from './icons/github'
import DeleteIcon from './icons-status/delete'
import ErrorIcon from './icons-status/error'
import PauseIcon from './icons-status/pause'
import ProgressIcon from './icons-status/progress'
import SuccessIcon from './icons-status/success'
import ApplicationIcon from './icons/application'
import AWSIcon from './icons/aws'
import AWSGrayIcon from './icons/aws-gray'
import BuildpacksIcon from './icons/buildpacks'
import ChildrenArrow from './icons/children-arrow'
import ContainerIcon from './icons/container'
import CronJobIcon from './icons/cron-job'
import CronJobStrokeIcon from './icons/cron-job-stroke-icon'
import DatabaseIcon from './icons/database'
import DOIcon from './icons/do'
import DOGrayIcon from './icons/do-gray'
import DockerIcon from './icons/docker'
import EnvironmentIcon from './icons/environment'
import GitIcon from './icons/git'
import InformationIcon from './icons/information'
import LifecycleJobIcon from './icons/lifecycle-job'
import LifecycleJobStrokeIcon from './icons/lifecycle-job-stroke-icon'
import MongoDBIcon from './icons/mongodb'
import PostgresqlIcon from './icons/postgresql'
import RedisIcon from './icons/redis'
import IconFa from './icon-fa/icon-fa'
import DragIcon from './icons/drag'
import './icon.scss'
export interface IconProps {
  name: IconEnum | IconAwesomeEnum | string
  width?: string
  height?: string
  viewBox?: string
  className?: string
  pathColor?: string
}

export function Icon (props: IconProps) {
  const formattedProps = { ...props }

  formattedProps.width = formattedProps.width || '1.5rem'
  formattedProps.viewBox = formattedProps.viewBox || '0 0 24 24'
  formattedProps.className = 'shrink-0' + (formattedProps.className || '')

  switch (props.name) {
    /* ICON HEROICONS */
    case IconAwesomeEnum.PLUS:
      return <PlusIcon {...formattedProps} />
    case IconAwesomeEnum.ANGLE_DOWN:
      return <ChevronDownIcon {...formattedProps} />
    case IconAwesomeEnum.EYE:
      return <EyeIcon {...formattedProps} />
    case IconAwesomeEnum.WHEEL:
      return <Cog6ToothIcon {...formattedProps} className="items-center justify-center flex" />
    case IconAwesomeEnum.WALLET:
      return <WalletIcon {...formattedProps} />
    case IconAwesomeEnum.USER_CROWN:
      return <AcademicCapIcon {...formattedProps} />
    case IconAwesomeEnum.ELLIPSIS_V:
      return <EllipsisVerticalIcon {...formattedProps} />
    

    /* ----- */

    case IconEnum.CONSOLE:
      return <div {...formattedProps}>
        <img src="/logo.png" className=" object-cover" alt="logo"/>
      </div>
    case IconEnum.GITHUB:
      return <GithubIcon {...formattedProps} />
    case IconEnum.GITHUB_WHITE:
      return <GithubWhiteIcon {...formattedProps} />
    case IconEnum.CHILDREN_ARROW:
      return <ChildrenArrow {...formattedProps} />
    case IconEnum.ENVIRONMENT:
      return <EnvironmentIcon {...formattedProps} />
    case IconEnum.AWS:
      return <AWSIcon {...formattedProps} />
    case IconEnum.AWS_GRAY:
      return <AWSGrayIcon {...formattedProps} />
    case IconEnum.DO:
      return <DOIcon {...formattedProps} />
    case IconEnum.DO_GRAY:
      return <DOGrayIcon {...formattedProps} />
    case IconEnum.APPLICATION:
      return <ApplicationIcon {...formattedProps} />
    case IconEnum.DATABASE:
      return <DatabaseIcon {...formattedProps} />
    case IconEnum.CONTAINER:
      return <ContainerIcon {...formattedProps} />
    case IconEnum.SUCCESS:
      return <SuccessIcon {...formattedProps} />
    case IconEnum.ERROR:
      return <ErrorIcon {...formattedProps} />
    case IconEnum.PAUSE:
      return <PauseIcon {...formattedProps} />
    case IconEnum.DELETE:
      return <DeleteIcon {...formattedProps} />
    case IconEnum.PROGRESS:
      return <ProgressIcon {...formattedProps} />
    case IconEnum.DOCKER:
      return <DockerIcon {...formattedProps} />
    case IconEnum.POSTGRESQL:
      return <PostgresqlIcon {...formattedProps} />
    case IconEnum.REDIS:
      return <RedisIcon {...formattedProps} />
    case IconEnum.BUILDPACKS:
      return <BuildpacksIcon {...formattedProps} />
    case IconEnum.MONGODB:
      return <MongoDBIcon {...formattedProps} />
    case IconEnum.INFORMATION:
      return <InformationIcon {...formattedProps} />
    case IconEnum.GIT:
      return <GitIcon {...formattedProps} />
    case IconEnum.CRON_JOB:
      return <CronJobIcon {...formattedProps} />
    case IconEnum.CRON_JOB_STROKE:
      return <CronJobStrokeIcon {...formattedProps} />
    case IconEnum.LIFECYCLE_JOB:
      return <LifecycleJobIcon {...formattedProps} />
    case IconEnum.LIFECYCLE_JOB_STROKE:
      return <LifecycleJobStrokeIcon {...formattedProps} />
    case IconEnum.DRAG:
      return <DragIcon {...formattedProps} />
    default:
      return <IconFa {...formattedProps} />
  }
}