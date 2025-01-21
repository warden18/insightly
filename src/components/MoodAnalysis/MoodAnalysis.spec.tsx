import { render, screen } from '@testing-library/react';

import MoodAnalysis from './MoodAnalysis';
import { isConsistentlyIncreasing, isTrendingDownwards } from './utils';

import { useUser } from '../../contexts/UserContext';

jest.mock('../../contexts/UserContext');
jest.mock('./utils');

const mockedIsConsistentlyIncreasing = isConsistentlyIncreasing as jest.Mock;
const mockedIsTrendingDownwards = isTrendingDownwards as jest.Mock;

describe('MoodAnalysis Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays improving mood message when moods are consistently increasing', () => {
    (useUser as jest.Mock).mockReturnValue({
      userMoods: [
        { mood: 1 },
        { mood: 2 },
        { mood: 3 },
      ],
    });
    mockedIsConsistentlyIncreasing.mockReturnValue(true);
    mockedIsTrendingDownwards.mockReturnValue(false);

    render(<MoodAnalysis />);

    expect(screen.getByText('Your mood has been improving over the past few days!')).toBeInTheDocument();
    expect(screen.getByText('Your mood has been improving over the past few days!').className).toContain('message--mood-increase');
  });

  it('displays specific mood message when moods are trending downwards', () => {
    (useUser as jest.Mock).mockReturnValue({
      userMoods: [
        { mood: 3 },
        { mood: 2 },
        { mood: 1 },
      ],
    });
    mockedIsConsistentlyIncreasing.mockReturnValue(false);
    mockedIsTrendingDownwards.mockReturnValue(true);

    render(<MoodAnalysis />);

    expect(screen.getByText("It seems like you've been feeling a bit down. Hang in there!")).toBeInTheDocument();
    expect(screen.getByText("It seems like you've been feeling a bit down. Hang in there!").className).toContain('message--mood-decrease');
  });

  it('displays balanced mood message when moods does not have trend', () => {
    (useUser as jest.Mock).mockReturnValue({
      userMoods: [
        { mood: 1 },
        { mood: 2 },
        { mood: 1 },
      ],
    });
    mockedIsConsistentlyIncreasing.mockReturnValue(false);
    mockedIsTrendingDownwards.mockReturnValue(false);

    render(<MoodAnalysis />);

    expect(screen.getByText('Your mood has been varying lately. Try finding balance!')).toBeInTheDocument();
    expect(screen.getByText('Your mood has been varying lately. Try finding balance!').className).toContain('message');
  });
});
