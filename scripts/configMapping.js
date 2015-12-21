define([], function(undefined){
    var _mapping = {
        viewToData:{
            AFFILIATIONS:{control:'btnAffiliations', 
                data:'affiliations.xml', 
                tagsXml:['affiliations', 'affiliation'],
                tagsXmlChildsCommon:['affiliationName'],
                modelCid:'affiliationsId',
                templateId:'templateAffiliations'},   
            BOARD:{control:'btnBoardMembers', 
                data:'board.xml', 
                tagsXml:['page', 'member'], 
                tagsXmlChildsCommon:['positionTitle', 'name', 'phone', 'email'],
                modelCid:'boardId',
                templateId:'templateBoardMembers'},                         
            CONTACT_US:{control:'btnContactUs', 
                data:'contactUs.xml', 
                tagsXml:['informations', 'information'],
                tagsXmlChildsCommon:['info'],
                modelCid:'contactUsId',
                templateId:'templateContactUs'},
            EVENTS:{control:'btnEventsIsNotUsed', 
                data:'events.xml', 
                tagsXml:['members', 'member'],
                tagsXmlChildsCommon:['heading', 'text'],
                modelCid:'eventsId',
                templateId:'templateEvents'},                
            HOME:{control:'btnHome', 
                data:'home.xml', 
                tagsXml:['paragraphs', 'paragraph'],
                tagsXmlChildsCommon:['heading', 'content'],
                modelCid:'homeId',
                templateId:'templateHome'},
            INTEREST_GROUPS:{control:'btnInterestGroups', 
                data:'interestGroups.xml', 
                tagsXml:['groups', 'group'],
                tagsXmlChildsCommon:['name', 'dateTime', 'contactPerson', 'contactPersonSecond'],
                modelCid:'interestGroupsId',
                templateId:'templateInterestGroups'},                
            MEETINGS:{control:'btnMeetings', 
                data:'meetings.xml', 
                tagsXml:['meetings', 'meeting'],
                tagsXmlChildsCommon:['dateNode', 'timeNode', 'info', 'location'],
                modelCid:'meetingsId',
                templateId:'templateMeetings'},                            
            MEMBERSHIP_APPLICATION:{control:'btnMembershipApplication', 
                data:'membershipApplication.xml', 
                tagsXml:['links', 'link'],
                tagsXmlChildsCommon:['pdf', 'word'],
                modelCid:'membershipApplicationId',
                templateId:'templateMembershipApplication'},                    
            MISSION_STATEMENT:{control:'btnMissionStatement', 
                data:'missionStatement.xml', 
                tagsXml:['paragraphs', 'paragraph'],
                tagsXmlChildsCommon:['heading', 'text'],
                modelCid:'missionStatementId',
                templateId:'templateMissionStatement'},
            NEWS:{control:'btnNews', 
                data:'news.xml', 
                tagsXml:['newsletters', 'newsletter'],
                tagsXmlChildsCommon:['pdf', 'word'],
                modelCid:'newsId',
                templateId:'templateNews'},
            SCHOLARSHIPS:{control:'btnScholarships', 
                data:'scholarships.xml', 
                tagsXml:['sections', 'section'],
                tagsXmlChildsCommon:['paragraph0', 'paragraph1', 'paragraph2', 'paragraph3', 'paragraph4', 'paragraph5', 'paragraph6', 
                'paragraph7', 'paragraph8', 'paragraph9', 'paragraph10', 'paragraph11'],
                modelCid:'scholarshipsId',
                templateId:'templateScholarships'}   
        }
    };

    return{
        mapping:_mapping
    }

}); // End define([] ...




