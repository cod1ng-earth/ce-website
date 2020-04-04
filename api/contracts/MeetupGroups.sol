pragma solidity ^0.5.0;

import '@openzeppelin/upgrades/contracts/Initializable.sol';
import '@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol';
import '@openzeppelin/contracts-ethereum-package/contracts/math/SafeMath.sol';


library MeetupLib {
  enum MeetupStatus {Scheduled, Past, Canceled}
  enum AttendeeStatus {Rsvp, NonRsvp}
}


contract Meetup is Ownable {
  uint256 timestamp;
  string name;
  bytes public cid;
  mapping(address => MeetupLib.AttendeeStatus) attendees;
  MeetupLib.MeetupStatus state;

  //todo waitlist ...

  function initialize(address owner) public initializer {
    Ownable.initialize(owner);
    state = MeetupLib.MeetupStatus.Scheduled;
  }

  function setTimestamp(uint256 _timestamp) public onlyOwner {
    timestamp = _timestamp;
  }

  function rsvp() public {
    attendees[msg.sender] = MeetupLib.AttendeeStatus.Rsvp;
  }

  function unRsvp() public {
    attendees[msg.sender] = MeetupLib.AttendeeStatus.NonRsvp;
  }

  function cancel() public onlyOwner {
    state = MeetupLib.MeetupStatus.Canceled;
  }
}


contract MeetupGroup is Initializable, Ownable {
  string public name;
  bytes public cid;
  string public meetupComId;

  mapping(uint256 => Meetup) meetups;

  function initialize(address owner) public initializer {
    Ownable.initialize(owner);
  }

  function updateContent(bytes memory _cid) public onlyOwner {
    cid = _cid;
  }

  function setMeetupComId(string memory mcId) public onlyOwner {
    meetupComId = mcId;
  }

  function setCid(bytes memory _cid) public onlyOwner {
    cid = _cid;
  }

  function schedule(uint256 _timestamp)
    public
    onlyOwner
    returns (Meetup meetup)
  {
    Meetup _meetup = new Meetup();
    _meetup.initialize(owner());
    _meetup.setTimestamp(_timestamp);

    return _meetup;
  }
}


contract MeetupGroups is Initializable, Ownable {
  event MeetupGroupCreated(
    address indexed creator,
    address group,
    string indexed name
  );

  MeetupGroup[] public groups;

  function initialize() public initializer {
    Ownable.initialize(msg.sender);
  }

  function getGroups() public view returns (MeetupGroup[] memory allGroups) {
    return groups;
  }

  function createMeetupGroup(string memory name)
    public
    returns (MeetupGroup group)
  {
    MeetupGroup _group = new MeetupGroup();
    _group.initialize(msg.sender);
    groups.push(_group);

    emit MeetupGroupCreated(msg.sender, address(_group), name);
    return _group;
  }
}
