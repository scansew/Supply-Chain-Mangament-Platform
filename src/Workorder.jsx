import * as React from 'react';
import { Accordion, Card, Grid, Collection, View, Flex, Badge, Divider, Heading, Text, Button, Image } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
// import './WO.css';

function WorkOrder({}) {

  const items = [
    {
      title: 'Milford - Room #1',
      badges: ['Waterfront', 'Verified'],
    },
    {
      title: 'Milford - Room #2',
      badges: ['Mountain', 'Verified'],
    },
  ];

  return (
    <div>
      <Grid
      templateColumns="1fr 4fr"
      columnGap="0.5rem"
    >  
        <Card
            columnStart="1"
            columnEnd="2"
          variation="outlined">
            <Collection
              items={items}
              type="list"
              direction="column"
              gap="20px"
              wrap="nowrap"
            >
              {(item, index) => (
                <Card
                  key={index}
                  borderRadius="medium"
                  maxWidth="20rem"
                  variation="outlined"
                >
                  <Image
                    src="/road-to-milford-new-zealand-800w.jpg"
                    alt="Glittering stream with old log, snowy mountain peaks tower over a green field."
                  />
                  <View padding="xs">
                    <Flex>
                      {item.badges.map((badge) => (
                        <Badge
                          key={badge}
                          backgroundColor={
                            badge === 'Waterfront' ? 'blue.40' 
                            : badge === 'Mountain' ? 'green.40' : 'yellow.40'}
                        >
                          {badge}
                        </Badge>
                      ))}
                    </Flex>
                    <Divider padding="xs" />
                    <Heading padding="medium">{item.title}</Heading>
                    <Button variation="primary" isFullWidth>
                      Book it
                    </Button>
                  </View>
                </Card>
              )}
            </Collection>
        </Card>
        <Card
            columnStart="2"
            columnEnd="-1"
            >
        <div className="accordion-container">
        <Accordion
          items={[
            {
              trigger: 'Original Videos/Images',
              value: 'accessible',
              content: 'Yes! It uses HTML native elements: <details> and <summary>.'
            },
            {
              trigger: 'Can I customize the styling?',
              value: 'styling',
              content: 'Of course! See the section on CSS Styling below.'
            },
            {
              trigger: 'Is it a great way to organize content?',
              value: 'content',
              content: 'Most definitely!'
            }
          ]}
        />
        </div>
      </Card>

    </Grid>

      
      
      </div>
  )
}
export default WorkOrder;