import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EuiCheckboxGroup, EuiPopover, EuiText } from '@elastic/eui';
import MaterialIcon from '@material/react-material-icon';
import { PostModal } from 'people/widgetViews/postBounty/PostModal';
import { Organization } from 'store/main';
import { colors } from '../../../../config';
import { OrgBountyHeaderProps } from '../../../../people/interfaces';
import { useStores } from '../../../../store';
import addBounty from './Icons/addBounty.svg';
import searchIcon from './Icons/searchIcon.svg';
import file from './Icons/file.svg';
import checkboxImage from './Icons/checkboxImage.svg';
import githubIcon from './Icons/githubIcon.svg';
import websiteIcon from './Icons/websiteIcon.svg';

interface styledProps {
  color?: any;
}

const Header = styled.div`
  height: 130px;
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
`;

const UrlButtonContainer = styled.div`
  width: 180px;
  display: flex;
  gap: 8px;
`;

const FillContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-bottom: 1px solid var(--Input-BG-1, #f2f3f5);
`;

const Filters = styled.div`
  display: flex;
  width: 1366px;
  padding: 10px 130px;
  justify-content: center;
  align-items: center;
  gap: 198px;
  align-self: stretch;
  background: #fff;
  margin-left: auto;
  margin-right: auto;
`;
const FiltersRight = styled.span`
  display: flex;
  height: 40px;
  padding-right: 122px;
  align-items: flex-start;
  gap: 52px;
  flex: 1 0 0;
  width: 1366px;
`;

const SkillContainer = styled.span`
  padding: 10px 0px;
  align-items: center;
  gap: 4px;
`;
const Skill = styled.select`
  border: none;
  background-color: transparent;
`;

const Button = styled.button`
  border-radius: 6px;
  background: var(--Primary-Green, #49c998);
  box-shadow: 0px 2px 10px 0px rgba(73, 201, 152, 0.5);
  border: none;
  display: flex;
  width: 144px;
  height: 40px;
  padding: 8px 16px;
  justify-content: flex-end;
  align-items: center;
  gap: 6px;
  color: var(--White, #fff);
  text-align: center;
  font-family: Barlow;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 0px; /* 0% */
  letter-spacing: 0.14px;
`;

const UrlButton = styled.button`
  border-radius: 4px;
  margin-right: auto;
  border: 1px solid #dde1e5;
  background: #ffffff;
  display: flex;
  width: 85px;
  height: 28px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  color: var(--Black, #5f6368);
  text-align: center;
  font-family: 'Barlow';
  font-size: 13px;
  font-style: normal;
  font-weight: 500;
  line-height: 0px; /* 0% */
  letter-spacing: 0.14px;
`;

const Label = styled.label`
  color: var(--Main-bottom-icons, #5f6368);
  font-family: Barlow;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: 17px;
  letter-spacing: 0.15px;
`;
const Leftheader = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
`;
const CompanyNameAndLink = styled.div`
  display: flex;
  flex-direction: column;
`;

const CompanyLabel = styled.p`
  color: var(--Text-2, #3c3f41);
  font-family: Barlow;
  font-size: 28px;
  font-style: normal;
  font-weight: 700;
`;
const ImageContainer = styled.img`
  width: 72px;
  height: 72px;
  border-radius: 66px;
`;

const CompanyDescription = styled.div`
  max-width: 403px;
  text-align: right;
  color: var(--Main-bottom-icons, #5f6368);
  font-family: Barlow;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
`;
const RightHeader = styled.div`
  max-width: 593px;
  display: flex;
  gap: 46px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SearchWrapper = styled.div`
  height: 40px;
  padding: 0px 16px;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  display: flex;
  position: relative;
`;

const Icon = styled.img`
  position: absolute;
  right: 30px;
`;

const SearchBar = styled.input`
  display: flex;
  height: 40px;
  padding: 0px 16px;
  padding-left: 30px;
  align-items: center;
  gap: 10px;
  flex: 1 0 0;
  border-radius: 6px;
  background: var(--Input-BG-1, #f2f3f5);
  outline: none;
  border: none;
`;

const SoryByContainer = styled.span`
  justify-content: center;
  align-items: center;
  gap: 4px;
`;
const SortBy = styled.select`
  background-color: transparent;
  border: none;
`;
const NumberOfBounties = styled.div`
  height: 23px;
  padding: 1.5px 983.492px 1.5px 10px;
  align-items: center;
  flex-shrink: 0;
  margin: 23px 133px;
  width: 1366px;
  margin-left: auto;
  margin-right: auto;
`;
const BountyNumber = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 11px;
`;
const PrimaryText = styled.p`
  color: var(--Primary-Text-1, var(--Press-Icon-Color, #292c33));
  font-family: Barlow;
  font-size: 15px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
`;
const SecondaryText = styled.p`
  color: var(--Main-bottom-icons, #5f6368);
  font-family: Barlow;
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const Img = styled.img`
  padding-bottom: 10px;
`;

const EuiPopOverCheckbox = styled.div<styledProps>`
  width: 147px;
  height: auto;
  padding: 15px 18px;
  border-right: 1px solid ${(p: any) => p.color && p.color.grayish.G700};
  user-select: none;
  .leftBoxHeading {
    font-family: 'Barlow';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 32px;
    text-transform: uppercase;
    color: ${(p: any) => p.color && p.color.grayish.G100};
    margin-bottom: 10px;
  }

  &.CheckboxOuter > div {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    .euiCheckboxGroup__item {
      .euiCheckbox__square {
        top: 5px;
        border: 1px solid ${(p: any) => p?.color && p?.color?.grayish.G500};
        border-radius: 2px;
      }
      .euiCheckbox__input + .euiCheckbox__square {
        background: ${(p: any) => p?.color && p?.color?.pureWhite} no-repeat center;
      }
      .euiCheckbox__input:checked + .euiCheckbox__square {
        border: 1px solid ${(p: any) => p?.color && p?.color?.blue1};
        background: ${(p: any) => p?.color && p?.color?.blue1} no-repeat center;
        background-size: contain;
        background-image: url(${checkboxImage});
      }
      .euiCheckbox__label {
        font-family: 'Barlow';
        font-style: normal;
        font-weight: 500;
        font-size: 13px;
        line-height: 16px;
        color: ${(p: any) => p?.color && p?.color?.grayish.G50};
        &:hover {
          color: ${(p: any) => p?.color && p?.color?.grayish.G05};
        }
      }
      input.euiCheckbox__input:checked ~ label {
        color: ${(p: any) => p?.color && p?.color?.grayish.G05};
      }
    }
  }
`;

const StatusContainer = styled.div<styledProps>`
  width: 70px;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 19px;
  margin-top: 4px;
  cursor: pointer;
  user-select: none;
  .filterStatusIconContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 48px;
    width: 38px;
    .materialStatusIcon {
      color: ${(p: any) => p.color && p.color.grayish.G200};
      cursor: pointer;
      font-size: 18px;
      margin-top: 5px;
    }
  }
  .statusText {
    font-family: 'Barlow';
    font-style: normal;
    font-weight: 500;
    font-size: 15px;
    line-height: 17px;
    letter-spacing: 0.15px;
    display: flex;
    align-items: center;
    color: ${(p: any) => p.color && p.color.grayish.G200};
  }
  &:hover {
    .filterStatusIconContainer {
      .materialStatusIcon {
        color: ${(p: any) => p.color && p.color.grayish.G50} !important;
        cursor: pointer;
        font-size: 18px;
        margin-top: 5px;
      }
    }
    .statusText {
      color: ${(p: any) => p.color && p.color.grayish.G50};
    }
  }
  &:active {
    .filterStatusIconContainer {
      .materialStatusIcon {
        color: ${(p: any) => p.color && p.color.grayish.G10} !important;
        cursor: pointer;
        font-size: 18px;
        margin-top: 5px;
      }
    }
    .statusText {
      color: ${(p: any) => p.color && p.color.grayish.G10};
    }
  }
`;

const Status = ['Open', 'Assigned', 'Completed', 'Paid'];
const color = colors['light'];
export const OrgHeader = ({
  onChangeStatus,
  checkboxIdToSelectedMap,
  org_uuid,
  languageString,
  organizationData
}: OrgBountyHeaderProps) => {
  const { main } = useStores();
  const [isPostBountyModalOpen, setIsPostBountyModalOpen] = useState(false);
  const [isStatusPopoverOpen, setIsStatusPopoverOpen] = useState<boolean>(false);
  const onButtonClick = async () => {
    setIsStatusPopoverOpen((isPopoverOpen: any) => !isPopoverOpen);
  };
  const closeStatusPopover = () => setIsStatusPopoverOpen(false);

  const selectedWidget = 'wanted';

  const handlePostBountyClick = () => {
    setIsPostBountyModalOpen(true);
  };
  const handlePostBountyClose = () => {
    setIsPostBountyModalOpen(false);
  };
  const handleWebsiteButton = (websiteUrl?: string) => {
    window.open(websiteUrl, '_blank');
  };

  const handleGithubButton = (githubUrl?: string) => {
    window.open(githubUrl, '_blank');
  };

  useEffect(() => {
    if (org_uuid) {
      main.getSpecificOrganizationBounties(org_uuid, {
        page: 1,
        resetPage: true,
        ...checkboxIdToSelectedMap,
        languageString
      });
    }
  }, [org_uuid, checkboxIdToSelectedMap, main, languageString]);

  if (!organizationData) return null;

  const { name, img, description, website, github } = organizationData as Organization;

  return (
    <>
      <FillContainer>
        <Header>
          <Leftheader>
            <ImageContainer src={img} width="72px" height="72px" alt="organization icon" />
            <CompanyNameAndLink>
              <CompanyLabel>{name}</CompanyLabel>
              <UrlButtonContainer data-testid="url-button-container">
                {website !== '' ? (
                  <UrlButton onClick={() => handleWebsiteButton(website)}>
                    <img src={websiteIcon} alt="" />
                    Website
                  </UrlButton>
                ) : (
                  ''
                )}
                {github !== '' ? (
                  <UrlButton onClick={() => handleGithubButton(github)}>
                    <img src={githubIcon} alt="" />
                    Github
                  </UrlButton>
                ) : (
                  ''
                )}
              </UrlButtonContainer>
            </CompanyNameAndLink>
          </Leftheader>
          <RightHeader>
            <CompanyDescription>{description}</CompanyDescription>
            <Button onClick={handlePostBountyClick}>
              <img src={addBounty} alt="" />
              Post a Bounty
            </Button>
          </RightHeader>
        </Header>
      </FillContainer>
      <FillContainer>
        <Filters>
          <FiltersRight>
            <EuiPopover
              button={
                <StatusContainer onClick={onButtonClick} color={color}>
                  <EuiText
                    className="statusText"
                    style={{
                      color: isStatusPopoverOpen ? color.grayish.G10 : ''
                    }}
                  >
                    Status
                  </EuiText>
                  <div className="filterStatusIconContainer">
                    <MaterialIcon
                      className="materialStatusIcon"
                      icon={`${isStatusPopoverOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}`}
                      style={{
                        color: isStatusPopoverOpen ? color.grayish.G10 : ''
                      }}
                    />
                  </div>
                </StatusContainer>
              }
              panelStyle={{
                border: 'none',
                boxShadow: `0px 1px 20px ${color.black90}`,
                background: `${color.pureWhite}`,
                borderRadius: '0px 0px 6px 6px',
                maxWidth: '140px',
                minHeight: '160px',
                marginTop: '0px',
                marginLeft: '20px'
              }}
              isOpen={isStatusPopoverOpen}
              closePopover={closeStatusPopover}
              panelClassName="yourClassNameHere"
              panelPaddingSize="none"
              anchorPosition="downLeft"
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row'
                }}
              >
                <EuiPopOverCheckbox className="CheckboxOuter" color={color}>
                  <EuiCheckboxGroup
                    options={Status.map((status: any) => ({
                      label: `${status}`,
                      id: status
                    }))}
                    idToSelectedMap={checkboxIdToSelectedMap}
                    onChange={(id: any) => {
                      onChangeStatus(id);
                    }}
                  />
                </EuiPopOverCheckbox>
              </div>
            </EuiPopover>
            <SkillContainer>
              <Label htmlFor="statusSelect">Skill</Label>
              <Skill id="statusSelect" />
            </SkillContainer>
            <SearchWrapper>
              <SearchBar placeholder="Search" disabled />
              <Icon src={searchIcon} alt="Search" />
            </SearchWrapper>
          </FiltersRight>
          <SoryByContainer>
            <Label htmlFor="statusSelect">Sort by:Newest First</Label>
            <SortBy id="statusSelect" />
          </SoryByContainer>
        </Filters>
      </FillContainer>
      <NumberOfBounties>
        <BountyNumber>
          <Img src={file} alt="" />
          <PrimaryText>284</PrimaryText>
          <SecondaryText>Bounties</SecondaryText>
        </BountyNumber>
      </NumberOfBounties>
      <PostModal
        widget={selectedWidget}
        isOpen={isPostBountyModalOpen}
        onClose={handlePostBountyClose}
      />
    </>
  );
};
