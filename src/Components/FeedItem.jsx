import React, { Component } from 'react'
import { Feed, Icon } from 'semantic-ui-react'
import Moment from 'react-moment'
import LazyImage from './LazyImage'

const DEFAULT_IMAGE = ''
// TODO: Get this from the store
const GATEWAY = 'http://127.0.0.1:5052'
class FeedItem extends Component {
  render () {
    const { index, item, imageSize, onImageClick, onCommentsClick, onLikesClick } = this.props
    const commented = item.comments && item.comments.length > 0
    return (
      <Feed.Event id={item.id} style={{ flex: '0 0 auto' }}>
        <Feed.Label>
          {!item.user.skip &&
            <LazyImage avatar
              onError={i => { i.target.src = DEFAULT_IMAGE }}
              src={`${GATEWAY}/ipfs/${item.user.avatar}/0/small/d`}
            />
          }
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary style={{ fontWeight: 'normal' }}>
            {!item.user.skip && <Feed.User as='span'>{item.user.name}</Feed.User>}
            {item.summary && !item.user.skip &&
              (item.target
                ? <a href={item.target}> {item.summary}</a>
                : <span style={{ color: 'gray' }}> {item.summary}</span>
              )}
            {!item.user.skip &&
              <Feed.Date>
                <Moment fromNow>{item.date}</Moment>
              </Feed.Date>
            }
          </Feed.Summary>
          {item.extraText &&
            <Feed.Extra text>{item.extraText}</Feed.Extra>
          }
          {item.extraImages &&
            <Feed.Extra images>
              {item.extraImages.map((img, i) => {
                return <LazyImage size={imageSize} key={i} as='a' onClick={onImageClick} src={img} />
              })}
            </Feed.Extra>
          }
          <Feed.Meta>
            {item.likes !== null &&
              <Feed.Like onClick={() => onLikesClick(item)}>
                <Icon
                  color={item.liked ? 'red' : null}
                  name={`heart${item.liked ? '' : ' outline'}`}
                />
                {item.likes && item.likes.length}
              </Feed.Like>
            }
            {item.comments !== null &&
            <Feed.Like onClick={() => onCommentsClick(index)}>
              <Icon
                color={commented ? 'grey' : null}
                name={`comment${commented ? '' : ' outline'}`}
              />
              {item.comments && item.comments.length}
            </Feed.Like>
            }
          </Feed.Meta>
        </Feed.Content>
      </Feed.Event>
    )
  }
}

export default FeedItem