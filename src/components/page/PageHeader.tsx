import * as React from 'react'
import styled from '@emotion/styled'

import { getEmSize } from '../../styles/mixins'
import { pxSizes, colors } from '../../styles/variables'
import Container from '../ui/Container'

interface PageHeaderProps {
  className?: string
  hasImage?: boolean
  size?: 'md' | 'lg' | 'xl' | 'fluid'
}

const PageHeader: React.SFC<PageHeaderProps> = ({ className, children, size }) => (
  <Section className={className}>
    <Container size={size || 'md'}>{children}</Container>
  </Section>
)

export default PageHeader

const Section = styled('section')`
  padding: 3rem 1.5rem 0;
  background-color: ${colors.white};
  z-index: 5;

  @media (min-width: ${getEmSize(pxSizes.breakpoints.lg)}) {
    font-size: 18px;
  }
`
