import React, { useState } from 'react';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import styled from 'styled-components';

const GameContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem;
`;

const GameWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 2rem;
`;

const TitleSection = styled.div`
  text-align: center;
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #6b7280;
`;

const AttemptsBox = styled.div`
  text-align: right;
`;

const AttemptsNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
`;

const AttemptsLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const GameBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const WordCard = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: center;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const StartIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #dbeafe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StartDot = styled.div`
  width: 0.75rem;
  height: 0.75rem;
  background-color: #3b82f6;
  border-radius: 50%;
`;

const TargetIcon = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #d1fae5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
`;

const CardLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
`;

const WordText = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${props => props.isTarget ? '#10b981' : '#1f2937'};
`;

const CurrentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CurrentCard = styled(WordCard)`
  margin-bottom: 1rem;
`;

const CurrentLabel = styled.div`
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
`;

const CurrentWord = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
`;

const DistanceText = styled.div`
  font-size: 0.875rem;
  margin-top: 0.25rem;
  color: ${props => {
    if (props.distance > 0.8) return '#3b82f6';
    if (props.distance > 0.5) return '#eab308';
    if (props.distance > 0.2) return '#f97316';
    return '#ef4444';
  }};
`;

const OperationBox = styled.div`
  background-color: #eff6ff;
  border-radius: 0.5rem;
  padding: 0.75rem;
`;

const OperationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const OperationButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  background-color: ${props => props.isActive ? '#3b82f6' : 'white'};
  color: ${props => props.isActive ? 'white' : 'black'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.isActive ? '#2563eb' : '#f3f4f6'};
  }
`;

const Input = styled.input`
  width: 160px;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  outline: none;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const CalculateButton = styled.button`
  width: 100%;
  padding: 0.5rem 1rem;
  background-color: #10b981;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #059669;
  }
`;

const DistanceIndicator = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const DistanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const DistanceLabel = styled.span`
  font-size: 1.125rem;
  font-weight: 500;
`;

const DistanceEmoji = styled.span`
  font-size: 1.125rem;
  font-weight: bold;
  color: ${props => {
    if (props.distance > 0.8) return '#3b82f6';
    if (props.distance > 0.5) return '#eab308';
    if (props.distance > 0.2) return '#f97316';
    return '#ef4444';
  }};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 1rem;
  background-color: #e5e7eb;
  border-radius: 9999px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(to right, #10b981, #ef4444);
  border-radius: 9999px;
  transition: width 0.5s ease;
  width: ${props => (1 - props.distance) * 100}%;
`;

const HistorySection = styled.div`
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const HistoryTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
`;

const HistoryWord = styled.span`
  font-weight: 500;
`;

const HistoryOperation = styled.span`
  margin: 0 0.5rem;
  color: #6b7280;
`;

const HistoryArrow = styled(ArrowRight)`
  margin: 0 0.5rem;
  color: #9ca3af;
`;

const HistoryResult = styled.span`
  font-weight: 500;
  color: #3b82f6;
`;

const WordVectorGame = () => {
  const [startWord] = useState('banana');
  const [targetWord] = useState('locomotive');
  const [currentWord, setCurrentWord] = useState('train');
  const [inputWord, setInputWord] = useState('');
  const [operation, setOperation] = useState('+');
  const [attempts, setAttempts] = useState(3);
  const [distance, setDistance] = useState(0.35);
  const [pathHistory, setPathHistory] = useState([
    { from: 'banana', operation: '+', word: 'metal', result: 'can' },
    { from: 'can', operation: '+', word: 'wheels', result: 'cart' },
    { from: 'cart', operation: '+', word: 'engine', result: 'train' }
  ]);

  const handleCalculate = () => {
    if (!inputWord.trim()) return;
    
    const newWord = 'cart';
    const newDistance = 0.73;
    
    setCurrentWord(newWord);
    setDistance(newDistance);
    setAttempts(attempts + 1);
    setPathHistory([...pathHistory, {
      from: currentWord,
      operation,
      word: inputWord,
      result: newWord
    }]);
    setInputWord('');
  };

  const getDistanceEmoji = () => {
    if (distance > 0.8) return '❄️ Cold';
    if (distance > 0.5) return '🌤️ Warm';
    if (distance > 0.2) return '🔥 Hot';
    return '🎯 Very Close!';
  };

  return (
    <GameContainer>
      <GameWrapper>
        <Header>
          <TitleSection>
            <Title>Word Vector Quest</Title>
            <Subtitle>
              Navigate through word space by adding or subtracting words to reach your target!
            </Subtitle>
          </TitleSection>
          <AttemptsBox>
            <AttemptsNumber>{attempts}</AttemptsNumber>
            <AttemptsLabel>attempts</AttemptsLabel>
          </AttemptsBox>
        </Header>

        <GameBoard>
          <WordCard>
            <CardHeader>
              <StartIcon>
                <StartDot />
              </StartIcon>
              <CardLabel>Start</CardLabel>
            </CardHeader>
            <WordText>{startWord}</WordText>
          </WordCard>
          
          <CurrentSection>
            <CurrentCard>
              <CurrentLabel>Current Position</CurrentLabel>
              <CurrentWord>{currentWord}</CurrentWord>
              <DistanceText distance={distance}>
                Distance: {distance.toFixed(2)}
              </DistanceText>
            </CurrentCard>
            
            <OperationBox>
              <OperationRow>
                <OperationButton
                  isActive={operation === '+'}
                  onClick={() => setOperation('+')}
                >
                  <Plus size={18} />
                </OperationButton>
                <OperationButton
                  isActive={operation === '-'}
                  onClick={() => setOperation('-')}
                >
                  <Minus size={18} />
                </OperationButton>
                <Input
                  type="text"
                  value={inputWord}
                  onChange={(e) => setInputWord(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCalculate()}
                  placeholder="Enter a word..."
                />
              </OperationRow>
              <CalculateButton onClick={handleCalculate}>
                Calculate
              </CalculateButton>
            </OperationBox>
          </CurrentSection>
          
          <WordCard>
            <CardHeader>
              <TargetIcon>🎯</TargetIcon>
              <CardLabel>Target</CardLabel>
            </CardHeader>
            <WordText isTarget>{targetWord}</WordText>
          </WordCard>
        </GameBoard>

        <DistanceIndicator>
          <DistanceHeader>
            <DistanceLabel>Distance to Target</DistanceLabel>
            <DistanceEmoji distance={distance}>
              {getDistanceEmoji()}
            </DistanceEmoji>
          </DistanceHeader>
          <ProgressBar>
            <ProgressFill distance={distance} />
          </ProgressBar>
        </DistanceIndicator>

        {pathHistory.length > 0 && (
          <HistorySection>
            <HistoryTitle>Your Journey</HistoryTitle>
            <HistoryList>
              {pathHistory.map((step, index) => (
                <HistoryItem key={index}>
                  <HistoryWord>{step.from}</HistoryWord>
                  <HistoryOperation>{step.operation}</HistoryOperation>
                  <HistoryWord>{step.word}</HistoryWord>
                  <HistoryArrow size={16} />
                  <HistoryResult>{step.result}</HistoryResult>
                </HistoryItem>
              ))}
            </HistoryList>
          </HistorySection>
        )}
      </GameWrapper>
    </GameContainer>
  );
};

export default WordVectorGame;