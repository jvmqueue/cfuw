define([], function(undefined){
    var _mapping = {
        viewToData:{
            HOME:{control:'btnHome', 
                data:'home.xml', 
                tagsXml:['members', 'member'],
                tagsXmlChildsCommon:['heading', 'text'],
                modelCid:'homeId',
                templateId:'templateHome'},
            MISSION_STATEMENT:{control:'btnMissionStatement', 
                data:'missionStatement.xml', 
                tagsXml:['paragraphs', 'paragraph'],
                tagsXmlChildsCommon:['heading', 'text'],
                modelCid:'missionStatementId',
                templateId:'templateMissionStatement'},
            CONTACT_US:{control:'btnContactUs', 
                data:'contactUs.xml', 
                tagsXml:['information', 'info'],
                tagsXmlChildsCommon:['join', 'name', 'email', 'vicePresident', 'mailingAddress', 'general'],
                modelCid:'contactUsId',
                templateId:'templateContactUs'},
            BOARD:{control:'btnBoadMembers', 
                data:'board.xml', 
                tagsXml:['page', 'member'], 
                tagsXmlChildsCommon:['positionTitle', 'name', 'phone', 'email'],
                modelCid:'boardId',
                templateId:'templateBoardMembers'},
            AFFILIATIONS:{control:'btnAffiliations', 
                data:'affiliations.xml', 
                tagsXml:['members', 'member'],
                tagsXmlChildsCommon:['position', 'name'],
                modelCid:'affiliationsId',
                templateId:'templateAffiliations'},
            MEMBERSHIP_APPLICATION:{control:'btnMembershipApplication', 
                data:'membershipApplication.xml', 
                tagsXml:['members', 'member'],
                tagsXmlChildsCommon:['heading', 'text'],
                modelCid:'membershipApplicationId',
                templateId:'templateMissionStatement'},
            NEWS:{control:'btnNews', 
                data:'news.xml', 
                tagsXml:['members', 'member'],
                tagsXmlChildsCommon:['heading', 'text'],
                modelCid:'newsId',
                templateId:'templateNews'},
            MEETINGS:{control:'btnMeetings', 
                data:'meetings.xml', 
                tagsXml:['meetings', 'meeting'],
                tagsXmlChildsCommon:['date', 'time', 'info', 'location'],
                modelCid:'meetingsId',
                templateId:'templateMeetings'},
            EVENTS:{control:'btnEvents', 
                data:'events.xml', 
                tagsXml:['members', 'member'],
                tagsXmlChildsCommon:['heading', 'text'],
                modelCid:'eventsId',
                templateId:'templateEvents'},
            INTEREST_GROUPS:{control:'btnInterestGroups', 
                data:'interestGroups.xml', 
                tagsXml:['members', 'member'],
                tagsXmlChildsCommon:['heading', 'text'],
                modelCid:'interestGroupsId',
                templateId:'templateInterestGroups'},
            SCHOLARSHIPS:{control:'btnScholarships', 
                data:'scholarships.xml', 
                tagsXml:['sections', 'section'],
                tagsXmlChildsCommon:['paragraph'],
                modelCid:'scholarshipsId',
                templateId:'templateScholarships'}   
        }
    };

    return{
        mapping:_mapping
    }

}); // End define([] ...




