import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';
import { EuiLoadingSpinner } from '@elastic/eui';
import styled from 'styled-components';
import { useBountyCardStore } from 'store/bountyCard';
import { BountyCard } from 'store/interface';
import { useStores } from '../../store';
import { colors } from '../../config';
import { WorkspacePlannerHeader } from './WorkspacePlannerHeader';
import BountyCardComponent from './BountyCards/index';

const PlannerContainer = styled.div`
  padding: 0;
  height: calc(100vh - 65px);
  background: ${colors.light.grayish.G950};
  overflow-y: auto;
`;

const ContentArea = styled.div`
  width: 90%;
  margin: 20px auto;
  background: white;
  border-radius: 8px;
  min-height: 500px;
  text-align: center;
  padding: 20px;
`;

const BountyCardList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 30px;

  li {
    background: ${colors.light.grayish.G800};
    margin: 10px 0;
    padding: 15px;
    border-radius: 5px;
    text-align: left;
  }
`;

const WorkspacePlanner = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const { main } = useStores();
  const [loading, setLoading] = useState(true);
  const [workspaceData, setWorkspaceData] = useState<any>(null);
  const bountyCardStore = useBountyCardStore(uuid);
  const history = useHistory();

  const onTitleClick = (bountyId: string) => {
    history.push(`/bounty/${bountyId}`);
  };

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      if (!uuid) return;
      const data = await main.getUserWorkspaceByUuid(uuid);
      setWorkspaceData(data);
      bountyCardStore.loadWorkspaceBounties();
      setLoading(false);
    };

    fetchWorkspaceData();
  }, [main, uuid, bountyCardStore]);

  if (loading) {
    return (
      <PlannerContainer style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <EuiLoadingSpinner size="xl" />
      </PlannerContainer>
    );
  }

  return (
    <PlannerContainer>
      <WorkspacePlannerHeader workspace_uuid={uuid} workspaceData={workspaceData} />
      <ContentArea>
        <h1>Welcome to the new Workspace Planner</h1>
        {bountyCardStore.loading ? (
          <EuiLoadingSpinner size="m" />
        ) : bountyCardStore.error ? (
          <p style={{ color: 'red' }}>{bountyCardStore.error}</p>
        ) : (
          <BountyCardList>
            {bountyCardStore.bountyCards.map((card: BountyCard) => (
              <BountyCardComponent key={card.id} {...card} onTitleClick={onTitleClick} />
            ))}
          </BountyCardList>
        )}
        {bountyCardStore.pagination.currentPage * bountyCardStore.pagination.pageSize <
          bountyCardStore.pagination.total && (
          <button onClick={() => bountyCardStore.loadNextPage()}>Load More</button>
        )}
      </ContentArea>
    </PlannerContainer>
  );
};

export default observer(WorkspacePlanner);
